const express = require('express');
const jwt = require("jsonwebtoken");


exports.authenticateToken = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(403) // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log("Authenticate Token: ", user)
    if (err) return res.sendStatus(403)
    req.user = user
    next() // pass the execution off to whatever request the client intended
  })
}
