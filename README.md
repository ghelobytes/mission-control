# r/SpaceX Mission Control

## Installation

To setup [Mission Control](https://github.com/r-spacex/mission-control/), run the following commands. This will copy the repo locally and install the requisite packages. You may need to enter your password to authenticate the installation.

```bash
git clone git@github.com:r-spacex/mission-control.git
cd mission-control
make install
```

## Environment variables

The following environment variables are expected to be set for ruby.

| variable | example value | purpose |
| --- | --- | --- |
| CLIENT_ID | `LFE3XY450n6cai` | authenticates with reddit API |
| RACK_ENV | `production` | allows external connections (disabled by default, use `production` to enable) |
| REDIRECT_URI | `https://example.com/auth/callback` | callback from reddit authentication |
| SECRET | `8BhhhFSSBZ9sYg6NZxQS7gsrnaq` | authenticates with reddit API |
| SUBREDDIT | `spacex` | subreddit to post to |

## Running the server

To run the server, go to the repo directory and run `ruby endpoints.rb`.

## Development

### gulp

To run [gulp](https://github.com/r-spacex/mission-control/blob/master/gulpfile.js), just use the `gulp` command, no arguments necessary. This will automatically do all of the following.

| task name | what it does |
| --- | --- |
| sass | transpile and minify all CSS |
| rollup-modules | combine all modules into a single file |
| rollup-packages | combine all packages into a single file |
| js-modules | minify js modules |
| watch | watch directories, calls the proper task when needed |

### CSS

Mission Control uses [Sass](http://sass-lang.com/), which is located in the [`/public/css`](https://github.com/r-spacex/mission-control/tree/master/public/css) directory. All CSS should be split into relevant files, and pulled together in [`all.sass`](https://github.com/r-spacex/mission-control/tree/master/public/css/all.sass).

### JavaScript

#### Packages

All packages are located in the [`/public/js/packages`](https://github.com/r-spacex/mission-control/tree/master/public/js/packages) directory. Mission Control currently uses the following packages.

- [annyang](https://github.com/TalAter/annyang)
- [Dialog polyfill](https://github.com/GoogleChrome/dialog-polyfill)
- [SimpleMDE](https://github.com/sparksuite/simplemde-markdown-editor)
- [Sortable](https://github.com/RubaXa/Sortable)

#### Modules

All JS written must be modular, as it makes maintenance more feasible. The modules are located in [`/public/js/modules`](https://github.com/r-spacex/mission-control/tree/master/public/js/modules). The following modules currently exist, with the relevent exports.

- [`ajax`](https://github.com/r-spacex/mission-control/tree/master/public/js/modules/ajax.js)
    - `ajax.get(url, data)`
    - `ajax.post(url, data)`
- [`annyang`](https://github.com/r-spacex/mission-control/tree/master/public/js/modules/annyang.js)
    - `speechRecognition()`
- [`auto-register`](https://github.com/r-spacex/mission-control/tree/master/public/js/modules/auto-register.js)
    - `autoRegisterDialog()`
- [`captues`](https://github.com/r-spacex/mission-control/blob/master/public/js/modules/captures.js)
    - `saveIfEnter(event)`
    - `_tabEvent(event, object)`
    - `setSign(object)`
- [`countdown`](https://github.com/r-spacex/mission-control/blob/master/public/js/modules/countdown.js)
    - `updateCountdown()`
    - `setLaunchTime(launchTime)`
    - `insertTime(object)`
- [`events`](https://github.com/r-spacex/mission-control/blob/master/public/js/modules/events.js)
    - `addEvent()`
    - `removeEvent()`
    - `addEventIfNeeded()`
- [`hotswap`](https://github.com/r-spacex/mission-control/blob/master/public/js/modules/hotswap.js)
    - `hotSwap(object)`
- [`intervals`](https://github.com/r-spacex/mission-control/blob/master/public/js/modules/intervals.js)
    - `createIntervals()`
- [`mde`](https://github.com/r-spacex/mission-control/blob/master/public/js/modules/mde.js)
    - `registerMDEs()`
- [`messages`](https://github.com/r-spacex/mission-control/blob/master/public/js/modules/messages.js)
    - `emergency(object)`
    - `std_message()`
- [`reddit`](https://github.com/r-spacex/mission-control/blob/master/public/js/modules/reddit.js)
    - `async save()`
    - `async saveEvents()`
    - `async createPost()`
    - `async updateStats()`
- [`ui`](https://github.com/r-spacex/mission-control/blob/master/public/js/modules/ui.js)
    - `showTab(object)`
    - `createSortable()`
    - `datetimeSupport()`
    - `removeLoadingModal()`
- [`youtube`](https://github.com/r-spacex/mission-control/blob/master/public/js/modules/youtube.js)
    - `async setYoutube()`

## Browser support

### Confirmed working
![Chrome 59+](https://img.shields.io/badge/Chrome-59+-green.svg)
![Firefox 55+](https://img.shields.io/badge/Firefox-55+-green.svg)
![Opera 46+](https://img.shields.io/badge/Opera-46+-green.svg)
![Safari 10.1+](https://img.shields.io/badge/Safari-10.1+-green.svg)

### Not checked
![Edge 16](https://img.shields.io/badge/Edge-16-lightgrey.svg)
![Chrome 58-](https://img.shields.io/badge/Chrome-58---lightgrey.svg)
![Firefox 54-](https://img.shields.io/badge/Firefox-54---lightgrey.svg)
![Opera 45-](https://img.shields.io/badge/Opera-45---lightgrey.svg)

### Confirmed broken
![Edge 15](https://img.shields.io/badge/Edge-15-red.svg)
![Safari 10.0](https://img.shields.io/badge/Safari-10.0-red.svg)

## License

[MIT license](https://github.com/r-spacex/mission-control/blob/master/LICENSE)

## Contributing

Feel free to [fork](https://github.com/r-spacex/mission-control/fork) and [create a PR](https://github.com/r-spacex/mission-control/compare). Creating a PR implies you are releasing the code under the [MIT license](https://github.com/r-spacex/mission-control/blob/master/LICENSE).

Please verify everything still works after you modify code ─ I haven't bothered to set up headless testing in Chrome or Firefox.
