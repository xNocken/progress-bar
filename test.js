const ProgressBar = require('.');

const bar = new ProgressBar({
  max: 10000,
});

for (let i = 0; i < 10000; i += 1) {
  bar.increase(1);
}

bar.clear('success');
