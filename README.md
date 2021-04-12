# Frontend developement - Projekt - Marek Połom

Strona korzysta z dwóch API. YouTube oraz mojego własnego API do komunikacji z bazą danych (MongoDB).
Baza danych zawarta jest pod tym linkiem -> [klik](https://github.com/marekpolom/youtube-search-api)

Do poprawnego uruchomienia projektu należy pobrać wszystkie zależności.
Baza odpalana jest poleceniem:

```bash
$ node index.js
```

Do poprawnego działania bazy wymagane jest MongoDB!

Obecna konfiguracja powinna automatycznie połączyć się z bazą MongoDB działającą w kontenerze Docker.

Aby wprowadzić własny klucz do API YouTube należy zastąpić go w pliku src/state/ducks/youtube/operations.js

## Screenshots

#### Front page
<a href="https://ibb.co/fdvkCt5"><img src="https://i.ibb.co/fdvkCt5/Zrzut-ekranu-2021-04-12-152717.png" alt="Zrzut-ekranu-2021-04-12-152717"></a>

#### LogIn
<a href="https://ibb.co/yk5pRtk"><img src="https://i.ibb.co/7pVQzPp/Zrzut-ekranu-2021-04-12-153155.png" alt="Zrzut-ekranu-2021-04-12-153155"></a>

#### SignUp
<a href="https://ibb.co/Qbpcrt3"><img src="https://i.ibb.co/ng60ztN/Zrzut-ekranu-2021-04-12-153140.png" alt="Zrzut-ekranu-2021-04-12-153140"></a>