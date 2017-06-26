#!/usr/bin/env python
import requests

print('hello world')
api_endpoint = 'http://test-env.vdxd9zppmk.us-west-2.elasticbeanstalk.com/api/devices/create_device' 

# Get device name from user and clean it up
device_name = None
device_name = input('Enter a device name (no_spaces allowed): ')
device_name = device_name.strip().replace(' ', '_')


# Get serial number from device
serial_number = None
with open('/factory/serial_number', 'r') as f:
    serial_number = f.read()

# Clean up serial number
if serial_number is not None:
    serial_number = serial_number.strip()

# Log
print(f"Attempting to create device instance on server with device name '{device_name}' and serial number '{serial_number}'")

# Send request to server to create the device
payload = { 'deviceName': device_name, 
            'serialNumber': serial_number}

print("Issuing request...")

response = requests.post(api_endpoint, data=payload).json()

print(response)

# Setup files...
with open('device-certificate.pem.crt', 'w') as f:
   f.write(response["certs"]["certificate_pem"])

with open('device-private.pem.key', 'w') as f: 
    f.write(response_json['certs']['private_key'])

# Get the ca-cert
response = requests.get('https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem')
# Write ca-cert to file
with open('ca-cert.crt', 'w') as f:
    f.write(response.content)


