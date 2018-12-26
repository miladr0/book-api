## What is this?

Simple Book Api

## Install

First Install Needed Packages:

```bash
npm install
```
## Connect to Database

You should installed mongodb before, then open `variable.env` file and
put your mongodb connection string there, for example:
```bash
DATABASE=mongodb://127.0.0.1/books
```
## Testing

First load sample data, run the following command in your terminal:

```bash
npm run sample
```

That will populate 4 Books. then Your Are ready To test. run the following command in your terminal:

```bash
mocha
```

