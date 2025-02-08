fn read_input(input: Option<&str>) -> String {
    let output = match input {
        None => include_str!("../input.txt"),
        Some(x) => x,
    };
    output.to_string()
}

fn get_santa_computer_secret(value: u32) -> String {
    format!("{value:X}")
}

#[derive(Debug, PartialEq)]
struct SantaComputer {
    data: String,
    checksum: String,
}

fn part1(input: String) -> u32 {
    input
        .split("\n\n")
        .map(|bag| {
            bag.trim()
                .split('\n')
                .map(|cal| cal.parse::<u32>().unwrap_or_default())
                .sum()
        })
        .max()
        .expect("error")
}

fn part2(input: String) -> u32 {
    let mut bags = input
        .split("\n\n")
        .map(|bag| {
            bag.trim()
                .split('\n')
                .map(|cal| cal.parse::<u32>().unwrap())
                .sum()
        })
        .collect::<Vec<u32>>();
    bags.sort();
    bags.iter().rev().take(3).sum()
}

fn checksum(s: String) -> String {
    (&s[2..]).to_string()
}

fn data(s: String) -> String {
    format!("*{}*", s)
}

fn part4(input: String) -> SantaComputer {
    // TODO revoir le BC
    let secret = get_santa_computer_secret(part1(input));
    let cs = checksum(secret.clone());
    SantaComputer {
        data: data(secret.clone()),
        checksum: cs,
    }
}

// fn part5(input: String) -> String {
//     todo!("Implement part 5");
// }

fn part8(input: String) -> u32 {
    todo!("Implement part 8");
}

fn main() {
    let input = read_input(None);

    let answer = part1(input);

    println!("Answer: {}", answer);
}

#[allow(unused_imports)]
#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;
    use indoc::indoc;
    use pretty_assertions::{assert_eq, assert_ne};

    #[test]
    fn test_fake() {
        assert_eq!(1, 1);
    }

    #[test]
    fn test_part1_sample() {
        let input = read_input(Some(indoc!(
            "
            1000
            2000
            3000

            4000

            5000
            6000

            7000
            8000
            9000

            10000
            "
        )));
        dbg!(&input);
        let answer = part1(input);
        assert_eq!(answer, 24000);
    }

    #[test]
    fn test_part1() {
        let input = read_input(None);
        dbg!(&input);
        let answer = part1(input);
        assert_eq!(answer, 69693);
    }

    #[test]
    fn test_part2_sample() {
        let input = read_input(Some(indoc!(
            "
            1000
            2000
            3000

            4000

            5000
            6000

            7000
            8000
            9000

            10000
            "
        )));
        dbg!(&input);
        let answer = part2(input);
        assert_eq!(answer, 45000);
    }

    #[test]
    fn test_part2() {
        let input = read_input(None);
        dbg!(&input);
        let answer = part2(input);
        assert_eq!(answer, 200945);
    }

    #[test]
    fn test_part3_sample() {
        let input = read_input(Some(indoc!(
            "
            1000
            2000
            3000

            4000

            5000
            6000

            7000
            Bleurg!!
            9000

            10000
            "
        )));
        dbg!(&input);
        let answer = part1(input);
        assert_eq!(answer, 16000);
    }
<<<<<<< Updated upstream

    #[ignore]
    #[test]
    fn test_part8_sample() {
        let input = read_input(Some(indoc!(
            "
            1000
            2000
            3000

            4000

            5000
            6000

            7000
            8000
            9000

            10000
            "
        )));
        dbg!(&input);
        let answer = part8(input);
        assert_eq!(answer, 45000);
    }
||||||| Stash base
=======

    // Proposed signature please remove comments to test
    #[test]
    fn test_data() {
        let value = String::from("A0C0");
        assert_eq!(data(value), String::from("*A0C0*"));
    }

    #[test]
    fn test_checksum() {
        let value = String::from("A0C0");
        assert_eq!(checksum(value), String::from("C0"));
    }

    #[test]
    fn test_part4_sample() {
        let input = read_input(Some(indoc!(
            "
            1000
            2000
            3000
    
            4000
    
            5000
            6000
    
            7000
            8000
            9000
    
            10000
            "
        )));
        dbg!(&input);
        let answer = part4(input);
        assert_eq!(
            answer,
            SantaComputer {
                data: String::from("*5DC0*"),
                checksum: String::from("C0")
            }
        );
    }

    // #[ignore]
    // #[test]
    // fn test_part5_sample() {
    //     let input = read_input(Some(indoc!(
    //         "
    //         1000
    //         2000
    //         3000

    //         4000

    //         5000
    //         6000

    //         7000
    //         8000
    //         9000

    //         10000
    //         "
    //     )));
    //     dbg!(&input);
    //     let answer = part5(input);
    //     assert_eq!(answer, String::from(r#"{"data":"*5DC0*","checksum":"C0"}"#));
    // }#[ignore]
    // #[test]
    // fn test_part2_sample() {
    //     let input = read_input(Some(indoc!(
    //         "
    //         1000
    //         2000
    //         3000

    //         4000

    //         5000
    //         6000

    //         7000
    //         8000
    //         9000

    //         10000
    //         "
    //     )));
    //     dbg!(&input);
    //     let answer = part2(input);
    //     assert_eq!(answer, 45000);
    // }

    // #[ignore]
    // #[test]
    // fn test_part2() {
    //     let input = read_input(None);
    //     dbg!(&input);
    //     let answer = part2(input);
    //     assert_eq!(answer, 200945);
    // }

    // // Proposed signature please remove comments to test
    // // #[ignore]
    // // #[test]
    // // fn test_data() {
    // //     let value = String::from("A0C0");
    // //     assert_eq!(data(value), String::from("*A0C0*"));
    // // }
    // //
    // // #[ignore]
    // // #[test]
    // // fn test_checksum() {
    // //     let value = String::from("A0C0");
    // //     assert_eq!(checksum(value), String::from("C0"));
    // // }

    // // #[ignore]
    // // #[test]
    // // fn test_part4_sample() {
    // //     let input = read_input(Some(indoc!(
    // //         "
    // //         1000
    // //         2000
    // //         3000
    // //
    // //         4000
    // //
    // //         5000
    // //         6000
    // //
    // //         7000
    // //         8000
    // //         9000
    // //
    // //         10000
    // //         "
    // //     )));
    // //     dbg!(&input);
    // //     let answer = part4(input);
    // //     assert_eq!(
    // //         answer,
    // //         SantaComputer {
    // //             data: String::from("*5DC0*"),
    // //             checksum: String::from("C0")
    // //         }
    // //     );
    // // }

    // #[ignore]
    // #[test]
    // fn test_part5_sample() {
    //     let input = read_input(Some(indoc!(
    //         "
    //         1000
    //         2000
    //         3000

    //         4000

    //         5000
    //         6000

    //         7000
    //         8000
    //         9000

    //         10000
    //         "
    //     )));
    //     dbg!(&input);
    //     let answer = part5(input);
    //     assert_eq!(answer, String::from(r#"{"data":"*5DC0*","checksum":"C0"}"#));
    // }
>>>>>>> Stashed changes
}
