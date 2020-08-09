#!/usr/bin/env joj

//env('green')
url(useenv('{{MY_API_URL}}'))
method('get')
header('accepts', 'application/json')
