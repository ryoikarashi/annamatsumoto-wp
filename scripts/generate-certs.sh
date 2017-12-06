#!/bin/bash

domain="annamatsumoto.dev"
path="./certs/"

openssl req -x509 -newkey rsa:2048 -keyout ${path}${domain}.key -out ${path}${domain}.crt -days 365 -nodes -subj "/C=US/ST=Oregon/L=Portland/O=Company Name/OU=Org/CN=${domain}" -config <(cat /etc/ssl/openssl.cnf <(printf "[SAN]\nsubjectAltName=DNS:${domain}")) -reqexts SAN -extensions SAN

# Add certificates to Keychain
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ${path}${domain}.crt;
