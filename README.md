# Coding Dojo #3

A rust exercise to be done in a coding dojo.

The goal is to create a small
[intro](https://en.wikipedia.org/wiki/Crack_intro).

## Expectations

Give participants some Rust insight that will give them
motivations to learn more.
This is also an experimentation to know if this approach could help people
to start and learn Rust.

## Instruction

### Part 1

- Create a starfield.
  - ⚠️  (0,0) is not the screen center.
  - Stars are darker and smaller in the center of the screen.
  - Advice refactor to use modules.

### Part  2

- Create a sinus, rainbow scrolling text.
  - Advice refactor to use a builder pattern.

# Build and run instructions
## Run Locally (mainly for development purposes)

1. Clone the project

```bash
  git clone https://github.com/uggla/dojo3
```

2. Go to the project directory

```bash
  cd dojo3
```

### Native
1. Install Rust following the instructions [here](https://www.rust-lang.org/fr/learn/get-started).

   *Tips: the rustup method is the simplest one.*

2. Install required library for macroquad

* Ubuntu system dependencies
```bash
apt install pkg-config libx11-dev libxi-dev libgl1-mesa-dev libasound2-dev
```

* Fedora system dependencies
```bash
dnf install libX11-devel libXi-devel mesa-libGL-devel alsa-lib-devel
```

* Windows and MacOS system
```
No dependencies are required for Windows or MacOS
```

3. Run
```bash
cargo run --release
```

#### Wasm32 client

1. Follow the above instruction of the native build.

2. Install basic-http-server
```bash
cargo install basic-http-server
```

3. Add the wasm32 compilation target
```bash
rustup target add wasm32-unknown-unknown
```

4. Run
```bash
cargo build --target wasm32-unknown-unknown --release
```

5. Serve the files and open the browser
```bash
basic-http-server
xdg-open http://127.0.0.1:4000
```

