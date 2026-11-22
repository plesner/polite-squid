# Polite Squid web app

Install the engine package's dependencies first, then install and build the app:

```sh
cd projects/engine-npm && npm install
cd ../web && npm install
npm run build
```

The app uses the local `@posqui/engine` package. After changing engine sources,
run `npm run build` in `projects/engine-npm` before building or running the app.
