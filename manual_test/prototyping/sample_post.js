#!/usr/bin/env joj

url('https://reqres.in/api/users')
method('post')
header('content-type', 'application/json')
body({
    name: 'morpheus',
    job: 'leader'
})
