const express = require("express")
const next = require("next")
const { createProxyMiddleware } = require("http-proxy-middleware")


//Dev environment Setup

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev });
const handel = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    if (dev) {
        server.use("/api", createProxyMiddleware({
            target: "http://localhost:8000",
            changeOrigin: true
        }))
    }
})
    .catch(err => {
        console.log("Error is ", err)
    })