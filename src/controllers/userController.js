  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const crypto = require('crypto');
  const { Op } = require('sequelize');
  const User = require('../models/user');

  // Obtener todos los usuarios
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send('Error al obtener los usuarios');
    }
  };

  // Crear un nuevo usuario con contraseña encriptada
  exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      // Verificar si el usuario o el correo electrónico ya existen
      const existingUser = await User.findOne({ where: { username } });
      const existingEmail = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
      }

      if (existingEmail) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        username,
        email,
        password: hashedPassword
      });

      res.status(201).json({ message: "Usuario creado exitosamente", userId: user.id });
    } catch (error) {
      console.error(error);
      res.status(400).send('Error al crear el usuario');
    }
  };

  // Login de usuario
  exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Autenticación fallida' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Autenticación fallida' });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ message: "Login exitoso", token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  };

  // Recuperar contraseña (solicitar enlace de restablecimiento)
  exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Correo electrónico no encontrado' });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      const resetPasswordExpires = Date.now() + 3600000; // 1 hora

      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpires = resetPasswordExpires;
      await user.save();

      // Aquí deberías enviar el resetToken por correo al usuario

      res.status(200).json({ message: 'Enlace para restablecer la contraseña enviado', resetToken });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  };

  // Actualizar contraseña (usando el token de restablecimiento)
  exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
      const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
      const user = await User.findOne({
        where: {
          resetPasswordToken,
          resetPasswordExpires: { [Op.gt]: Date.now() }
        }
      });

      if (!user) {
        return res.status(400).json({ message: 'Token no válido o expirado' });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  };
