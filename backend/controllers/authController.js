import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


//Register
export const register = async (req, res) => {
  try{
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
      return res.status(400).json({message : 'All fields are required.'});
    }
    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(409).json({
          message: 'email already exist'
        });
    }
    const newUser = await User.create({ username, password, email});

    res.status(201).json({
      message : 'User registered successfully !',
      user :{ 
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch(error){
    console.error('Register error:', error);
    res.status(500).json({
      message: 'Server error during registration'
    })
  }
};

// login
export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(!email || !password) {
      return res.status(400).json({message : 'email and password are required'});
    }
    const user = await User.findOne({email});
    if(!user || user.password != password) {
      return res.status(404).json({message : "invalid input"});
    }
    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET,{
      expiresIn: '7d'
    });
    res.status(200).json({
     message : 'login sucessful!',
     token,
     user : {
      id : user._id,
      username : user.username,
      email: user.email
     }
    });
  } catch(error) {
    console.error('login error',error);
    res.status(200).json({
      message:'error during login'
    });
  }
};