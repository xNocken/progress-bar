class ProgressBar {
  constructor(options) {
    this.progressChar = options.progressChar || '>';
    this.fillerChar = options.fillerChar || '-';
    this.borderChar = options.borderChar || '|';
    this.max = options.max || 100;
    this.progress = options.initial || 0;
    this.beforeText = options.beforeText || ':percent';
    this.afterText = options.afterText || ':current/:max';
    this.windowWidth = 0;
    [this.windowWidth] = process.stdout.getWindowSize();

    process.stdout.on('resize', () => {
      [this.windowWidth] = process.stdout.getWindowSize();
      this.updateProgressBar();
    });
  }

  getText(baseText) {
    return baseText
      .replace(':current', this.progress)
      .replace(':max', this.max)
      .replace(':percent', `${((this.progress / this.max) * 100).toFixed(1)}%`);
  }

  static out(text) {
    if (process.stdout.isTTY) {
      process.stdout.write(text);
    }
  }

  updateProgressBar() {
    const beforeText = this.getText(this.beforeText);
    const afterText = this.getText(this.afterText);

    const length = beforeText.length
      + afterText.length
      + 2 // spaces between bar and text
      + this.borderChar.length * 2;

    const barLength = this.windowWidth - length;

    if (barLength < 0) {
      return;
    }

    const charCount = Math.min(Math.floor((this.progress / this.max) * barLength), barLength);
    const fillerCount = barLength - charCount;

    const chars = this.progressChar.repeat(charCount);
    const fillers = this.fillerChar.repeat(fillerCount);

    const string = `\r${beforeText} ${this.borderChar}${chars}${fillers}${this.borderChar} ${afterText}`;

    ProgressBar.out(string);
  }

  increase(amount = 1) {
    this.progress += amount;

    this.updateProgressBar();
  }

  log(message) {
    ProgressBar.out(`\r${message}${' '.repeat(this.windowWidth - message.length)}\n`);

    this.updateProgressBar();
  }

  clear(text = '') {
    ProgressBar.out(`\r${text}${' '.repeat(this.windowWidth - text.length)}`);
  }
}

module.exports = ProgressBar;
