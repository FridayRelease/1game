### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn build`
4. Выполните команду `docker compose up postgres` что бы запусить БД.
5. Выполните команду `yarn dev --scope server` чтобы запустить режим разработки. Будет налету отображать измнениния. (localhost:3001)
6. Выполните команду `yarn preview --scope server` Преварительно остановить режим разработки. Запустить локальный продакшн режим. (localhost:3001)

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

`docker compose up` - запустит сервисы server и postgres
`docker compose --profile pgadmin up` - запустит сервисы server, postgres и pgadmin

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

### Структура папок

- `components` - будет содержать отдельный компонент всего приложения (`button`, `input`, ...)
- `pages` - эта папка должна содержать один файл для каждой страницы приложения
- `assets` - эта папка содержит все изображения, файлы css, файлы шрифтов и т.д
- `store` - эта папка содержит хранилище состояний
- `controllers` - эта папка содержит логику взаимодействия с любым внешним API
- `api` - эта папка cодержит запросы к серверу
- `utils` - эта папка предназначена для хранения всех служебных функций, таких как средства `classnames`
- `types` - эта папка предназначена для описание всех сущностей приложения
- `features` - эта папка очень похоже на `pages`, но вместо группировки по страницам мы группируем по функциям. Разница между `pages` и `features` папкой, заключается в том, что внутри каждой функции у вас есть другой набор папок. Это означает, что внутри `features` весь код может быть организован по типу (контекст, хук, компоненты и т. д.), но при этом быть расположенным в одном месте.

### HTTPS инструкция для виртуалки Яндекс Облаке

При создании виртуалки в облаке указали docker-compose (он запускается автоматом при старте виртуалки. Если изменить docker-compose, то он запускается с изменениями через +- минуту.

Прописали А-запись (fr-vm-1game.ya-praktikum.tech 51.250.26.190)

1. создаём docker-compose.yml прям в корне рутового пользователя

```
version: '3'

services:
  webserver:
    image: nginx:latest
    ports:
      - 80:80
      - 443:443
    restart: always
    volumes:
      - ./nginx/conf/:/etc/nginx/conf.d/:ro
      - ./certbot/www:/var/www/certbot/:ro
      - ./certbot/conf/:/etc/nginx/ssl/:ro
      - ./nginx/www/:/var/www/test-https/:ro
    networks:
      - awesome

  certbot:
    image: certbot/certbot:latest
    volumes:
      - ./certbot/www/:/var/www/certbot/:rw
      - ./certbot/conf/:/etc/letsencrypt/:rw

networks:
  awesome:
    name: coi_awesome
    external: true
```

2. создаём nginx/conf/app.conf

```
server {
    listen 80 default_server;

    server_name fr-vm-1game.ya-praktikum.tech;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
}
```

3. пробуем создать сертификат, команда с флагом --dry-run

```
root@fr-vm-1game:~# docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d fr-vm-1game.ya-praktikum.tech
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Simulating a certificate request for fr-vm-1game.ya-praktikum.tech
The dry run was successful.
root@fr-vm-1game:~#
```

4. после успешного теста создания сертификата, создаём его, команда без флага --dry-run

```
root@fr-vm-1game:~# docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d fr-vm-1game.ya-praktikum.tech
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for fr-vm-1game.ya-praktikum.tech

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/fr-vm-1game.ya-praktikum.tech/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/fr-vm-1game.ya-praktikum.tech/privkey.pem
This certificate expires on 2023-09-17.
These files will be updated when the certificate renews.

NEXT STEPS:
- The certificate will need to be renewed before it expires. Certbot can automatically renew the certificate in the background, but you may need to take steps to enable that functionality. See https://certbot.org/renewal-setup for instructions.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
root@fr-vm-1game:~#
```

#### структура с созданными сертификатами

```
root@fr-vm-1game:~# find certbot/
certbot/
certbot/conf
certbot/conf/renewal
certbot/conf/renewal/fr-vm-1game.ya-praktikum.tech.conf
certbot/conf/archive
certbot/conf/archive/fr-vm-1game.ya-praktikum.tech
certbot/conf/archive/fr-vm-1game.ya-praktikum.tech/chain1.pem
certbot/conf/archive/fr-vm-1game.ya-praktikum.tech/privkey1.pem
certbot/conf/archive/fr-vm-1game.ya-praktikum.tech/fullchain1.pem
certbot/conf/archive/fr-vm-1game.ya-praktikum.tech/cert1.pem
certbot/conf/accounts
certbot/conf/accounts/acme-staging-v02.api.letsencrypt.org
certbot/conf/accounts/acme-staging-v02.api.letsencrypt.org/directory
certbot/conf/accounts/acme-staging-v02.api.letsencrypt.org/directory/a6484537a0330142622073bfd617047b
certbot/conf/accounts/acme-staging-v02.api.letsencrypt.org/directory/a6484537a0330142622073bfd617047b/meta.json
certbot/conf/accounts/acme-staging-v02.api.letsencrypt.org/directory/a6484537a0330142622073bfd617047b/regr.json
certbot/conf/accounts/acme-staging-v02.api.letsencrypt.org/directory/a6484537a0330142622073bfd617047b/private_key.json
certbot/conf/accounts/acme-v02.api.letsencrypt.org
certbot/conf/accounts/acme-v02.api.letsencrypt.org/directory
certbot/conf/accounts/acme-v02.api.letsencrypt.org/directory/6a672c2a357ee89c8c954fce78d71f7b
certbot/conf/accounts/acme-v02.api.letsencrypt.org/directory/6a672c2a357ee89c8c954fce78d71f7b/meta.json
certbot/conf/accounts/acme-v02.api.letsencrypt.org/directory/6a672c2a357ee89c8c954fce78d71f7b/regr.json
certbot/conf/accounts/acme-v02.api.letsencrypt.org/directory/6a672c2a357ee89c8c954fce78d71f7b/private_key.json
certbot/conf/renewal-hooks
certbot/conf/renewal-hooks/pre
certbot/conf/renewal-hooks/deploy
certbot/conf/renewal-hooks/post
certbot/conf/live
certbot/conf/live/fr-vm-1game.ya-praktikum.tech
certbot/conf/live/fr-vm-1game.ya-praktikum.tech/privkey.pem
certbot/conf/live/fr-vm-1game.ya-praktikum.tech/README
certbot/conf/live/fr-vm-1game.ya-praktikum.tech/chain.pem
certbot/conf/live/fr-vm-1game.ya-praktikum.tech/cert.pem
certbot/conf/live/fr-vm-1game.ya-praktikum.tech/fullchain.pem
certbot/conf/live/README
certbot/www
root@fr-vm-1game:~#
```

5. правим nginx/conf/app.conf

```
server {
    listen 80 default_server;

    server_name fr-vm-1game.ya-praktikum.tech;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://fr-vm-1game.ya-praktikum.tech$request_uri;
    }
}

server {
    listen 443 default_server ssl;
    http2 on;

    server_name fr-vm-1game.ya-praktikum.tech;

    ssl_certificate /etc/nginx/ssl/live/fr-vm-1game.ya-praktikum.tech/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/live/fr-vm-1game.ya-praktikum.tech/privkey.pem;

    location / {
        proxy_pass http://prakticum-server:3001;
    }
}
```

6. запускаем docker-compose `docker-compose up -d`
7. заходим в браузер: `fr-vm-1game.ya-praktikum.tech` попадаем сюда `https://fr-vm-1game.ya-praktikum.tech/login`

#### логи можно посмотреть так: `docker-compose logs -f`
