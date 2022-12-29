/* {
  "type": "service_account",
  "project_id": "radium-draft",
  "private_key_id": "3edf9ab5ec318115d0405c06a73c16e080a62e65",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxdzWhlo28kptF\nu/W3qyOQ7X26K+aD4DxpGsjSL4W7RKr+U0dU3OFoyZ8g6izJNK49JysWPxdp6k7x\nwwBJpI+nmfqHp/GxH8nIdJpHI+4OAWZSVf7LmJ1vyY1YZzXgiPBnmjNn40HEpOnD\nujpgr/pMhNjao6nNIPrBpxV8A3Obo+FCcc5kEsp03lVFJo8keed4xN1MFKmWQxAO\nEeC8cgJ+k2gf2ma7SWeESONCM1MJKcYdZpohJkjfkMHXDySvDUZZQdG4eRBGQXx5\niengcaKTszcuYOuAeew0dkKqk8tIx546YROMPMnQQmJ+jwbn7FeDueGn0PQVR9uH\nJJ8tKxAjAgMBAAECggEAF/TewYyAX7duzJAeEIhCydq1gT9R4/WOUiXyfCU8KVaQ\nurplQ7h5mVq2Z4wVNagt6UVzVJJ5x6uAsrQ/QrG7TsXDgzKRtvZyl+Pdu8LG7Q8V\nUAIZ3kQg5KlRsmBkboYt5d50GA8enrwgbnKiVNEMue2pFILJdk6Aa0nx5YbVwWm5\nMJwPNIAH3u6zybwMYJfpCpx+MNW70zznoGpmtI479YOb4wxqeFQRKPm5Dy78u087\nxQ70M79XepoU/qDys80WThxKtnLguHO94tZttAzd9tOHa/hE3Vf+XaGAAQkTPTwP\n2biaDg2wbWC5LSqAB3Y3B5DDep8vpuwMW0XB0ogm2QKBgQDsbxDSlrNZUyd9B8sn\nu3igDNPwXw3Bop8Log6QcIWoj1f6+xuzIcagapNZE9xVs6cXDzsaj9Dj8iIAOr37\nEMOGP1p7NAZNGS5g0fLPj4xTFM7zAE8Y06apb6HIMvsObyX3In3g7oNN63h1GceF\n9RUBhVv+lKCMnvTbxXg1OtgjLwKBgQDAJuHI4xF6BCdUEx1cdCMdvPn1mOlBkYZ6\nJ5tIsAQQcYQhvssZqmTmugUdH2Db/aG68JN1iRIrJKfq0wmQfo0NpRlnKc1xroXF\n5kHemz7lp8O0q4vwbtGXRh8dpxub4fTXoDj4uXP3BBfz4Oz4fF5eIY8xezmZFb5J\neiO3Oix1TQKBgC+uooTl8ZulIoSbqsQDkestSxzh/qM7ibnN4AQPPVVmO0cZl1eE\nC0vU0oyXbcs25Q7IepH7yRP/hA3pyuC0W8paQoQwVMj9uBW8oaxsdc9Xlfj56fnG\nzYjEQ6tdZLZfgheaNCrFz2NKhsuO/GcuqyLYY1ovXUWe1SDxbTHHAUnvAoGAXsmP\nbbKdp2wvHmlDfZ0IyZ20THP+9Mpd5Rpunp+9kYL95EujEukcVzkCVsho1ny6cGZG\nx58zaDbv4oXyXOYgnM+JxXs4jlDCSsp4SeCZWV61ywUoxhVUrOP5a35Iv0/qoQe3\nsvKBAyRw0GxvWXC4eITjh0w7MIoqUULAJZ272q0CgYEAzHt86+2rxAILaa5DZsvH\nxC9tXQtYrEXWd4qUjRhcE8im605LKjrDAZaM57SOcUbqQlBOTY4pm0JrbXw3L1iU\nzzvA0U7flXVWejnUkyNin2laSN8tTNJAa7k+LU8FQmx9WrRK9Gj9vuIbyHxNKtLY\nNI7x27CMdyE/Rk2zbbOUh9k=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-bfit3@radium-draft.iam.gserviceaccount.com",
  "client_id": "106885316885067466960",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bfit3%40radium-draft.iam.gserviceaccount.com"
} */

import admin from 'firebase-admin';

import serviceAccount from './radium-draft-firebase-adminsdk-bfit3-3edf9ab5ec.json';

export const Firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as unknown as string),
});
