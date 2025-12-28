# Programowanie Front-end — Projekt semestralny (aplikacja Pogoda)

Repozytorium zawiera aplikację pogodową zbudowaną w technologii **Vite + React**.
Aplikacja zawiera wymagania konieczne, dodatkowe oraz kilka innych funkcji. 

Projekt korzysta z OpenWeather API do pobierania rzeczywistych danych pogodowych.

## Funkcjonalności

Aplikacja realizuje m.in.:
-ekran główny z listą przykładowych popularnych miejscowości
-szczegółowy podgląd pogody dla wybranej/wyszukanej miejscowości
    --bieżąca temperatura
    --warunki pogodowe w postaci ikony (dzień/noc)
    --wiatr (prędkość+kierunek)
    --zachmurzenie
    --wilgotność
-wyszukiwanie miejscowości po nazwie
-możliwość pobrania miejscowości na podstawie geolokalizacji przeglądarki (działa na Chrome po udzieleniu zgód)
-globalna zmiana jednostek temperastury (C/F/K)
-ulubione miejscowości (serduszko)
    --dodawanie i usuwanie z listy
    --podpowiedzi z ulubionych w polu wyszukiwania
-zapis ustawień w local storage
    --wybrana jednostka temperatury
    --lista ulubionych miejscowości
>UWAGA: Temperatura na przyszłe dni jest "losowa" na podstawie obecnej temperatury, wynika to z ograniczeń darmowego wariantu API OpenWeather

## Jak uruchomić projekt

W pierwszej kolejności należy użyć narzędzia NVM do wybrania odpowiedniej wersji Node.js:

```shell
nvm use
```

Jeżeli narzędzie zwróci błąd o tym, że obecnie nie jest zainstalowana żądana wersja Node'a, wówczas należy użyć komendy:
```shell
nvm install 20.18.0
nvm use
```

Następnie należy zainstalować biblioteki wymagane do uruchomienia projektu:
```shell
npm install
```

Potem projekt można uruchomić w przeglądarce używając polecenia:
```shell
npm run dev
```

## Lista zainstalowanych bibliotek / narzędzi

>React
>React Redux + ReduxJS Toolkit,
>Vite,
>ESLint

## Struktura katalogów

>src/components - katalog zawierający komponenty aplikacji (widoki+UI)
>src/store - konfiguracja Redux store + slice’y 
>src/utils - funkcje pomocnicze 
>public/icons - ikony pogodowe wykorzystywane w aplikacji