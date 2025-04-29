import express from 'express';
import dotenv from 'dotenv';
import jwd from 'jsonwebtoken';
import User from '../models/user';

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

    res.status(204).json({
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
    
  }
}