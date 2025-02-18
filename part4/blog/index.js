const express = require('express')
const {info , error} = require('./utils/logger')
const config = require('./utils/config')
const app = require('./app')

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})