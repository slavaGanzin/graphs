require('fast-require')({
  global:  true,
  install:  true,
})

function build() {
  esbuild.build({
    entryPoints: ['./front/index.jsx'],
    bundle: true,
    outfile: './public/index.js',
    sourcemap: 'inline',
  }).catch(e => nodeNotifier.notify(e.message))
}

build()

chokidar.watch('front').on('change', build);

liveServer.start({
  port: 80,
  root: './public',
  open: false,
  file: 'index.html',
});
