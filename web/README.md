# Web app

Install the engine package's dependencies first, then install and build the app:

```sh
cd engine && npm install
cd ../web && npm install
npm run build
```

The app uses the local `@atob/engine` package. After changing engine sources,
run `npm run build` in `engine` before building or running the app.
