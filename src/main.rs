use macroquad::prelude::*;

fn window_conf() -> Conf {
    Conf {
        window_title: "Dojo intro".to_string(),
        window_width: 1280,
        window_height: 720,
        ..Default::default()
    }
}

struct Star {
    position: Vec2,
    radius: f32,
    color: Color,
    direction: Vec2,
}

trait Centerable{
    fn center(&self) -> Vec2;
}

impl Centerable for Vec2{
    fn center (&self) -> Vec2{
        *self + Vec2::new(screen_width() / 2.0, screen_height() / 2.0)
    }
}

impl Star {
    fn new(position: Vec2, radius: f32, color: Color) -> Self {
        Self {
            position,
            radius,
            color,
            direction:Vec2::new(rand::gen_range(-10.0, 10.0), rand::gen_range(-10.0, 10.0))
        }
    }
    fn draw(&self) {
        draw_circle(self.position.x, self.position.y, self.radius, self.color);
    }
    fn update_position(&mut self) {
        self.position += self.direction
    }
}

#[macroquad::main(window_conf)]
async fn main() {
    let mut stars = Vec::new();
    for _i in 0..100 {
        let star = Star::new(
            Vec2::new(0.0,0.0).center(),
            20.0,
            WHITE,
        );
        stars.push(star);
    }
    loop {
        for star in stars.iter_mut() {
            star.draw();
            star.update_position();
        }
        

        println!("fps: {}", get_fps());
        next_frame().await;
    }
}

#[cfg(test)]
#[allow(dead_code)]
#[allow(unused_imports)]
mod tests {
    use super::*;

    #[test]
    // #[macroquad::test]
    fn fake_test() {
        assert_eq!(1, 1);
    }
}
