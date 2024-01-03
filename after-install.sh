#!/bin/bash

# Logging the start of the script
echo "Starting deployment script"

# Removing the existing index.html file
echo "Removing existing index.html file"
rm -rf /var/www/html/index.html || { echo 'Failed to remove index.html'; exit 1; }

# Copying new files from the build directory
echo "Copying new files to web root"
cp -r /var/www/html/dist/alemite-cloud/* /var/www/html/ || { echo 'Failed to copy files'; exit 1; }

# Setting the correct permissions for the web server
echo "Setting permissions for web root"
chown -R www-data:www-data /var/www/html/ || { echo 'Failed to set owner for web files'; exit 1; }
chmod -R 755 /var/www/html/ || { echo 'Failed to set permissions for web files'; exit 1; }

# Add here any commands to restart or reload your web server if necessary
# For example, if you are using Apache:
echo "Restarting Apache server"
service apache2 restart || { echo 'Failed to restart Apache'; exit 1; }

echo "Deployment successful"
