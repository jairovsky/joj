#!/usr/bin/env node

const ax = require('axios')
const fs = require('fs')
const path = require('path')

if (process.argv.length <= 2) {
    console.log('usage: joj my_request_file.js')
    process.exit(1)
}

let file = process.argv[process.argv.length-1]

function findEnvFile(name) {
    var searchPath = path.normalize(process.cwd()+'/'+path.dirname(file))
    let root = path.parse(searchPath).root
    while (searchPath !== root) {
        if (fs.existsSync(`${searchPath}${path.sep}${name}.env.json`)) {
            return require(`${searchPath}${path.sep}${name}.env.json`)
        }
        // go up one dir
        searchPath = path.normalize(searchPath+path.sep+'..')
    }

    if (name !== 'default') {
        console.log('no ' + name + '.env.json found. Exiting...')
        process.exit(1)
    }
}
global._env = {}
global.env = (x) => {
    let newvars = findEnvFile(x)
    for (i in newvars) {
        _env[i] = newvars[i]
    }
}
env('default')
global.e = (x) => _env[x]
global.useenv = function(str) {
    let reg = /{{([A-Z0-9_]*)}}/g
    return str.match(reg).reduce((acc, x) => acc.replace(x, e(x.replace(/{|}/g, ''))), str)
}

var req = {headers:{}}
global.url = (u) => req.url = u
global.method = (u) => req.method = u
global.body = (u) => req.body = u
global.header = (h, v) => req.headers[h] = v

require(process.cwd()+'/'+file)

function print(r) {
    process.stdout.write(JSON.stringify({
        headers: r.headers,
        body: r.data,
        status: r.status
    }))
}

ax({url: req.url, method: req.method, data: req.body, headers: req.headers})
    .then(print)
    .catch(e => print(e.response))
