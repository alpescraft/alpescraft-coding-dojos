import unittest

class IGREC:

    def __init__(self):
        self.post = {}

    def command(self, command_line):
        if command_line.find("/post") != -1:
            name, message = command_line.split("/post")
            self.post[name.strip()] = message.strip()

        elif command_line.find("/timeline") != -1:
            request_name = command_line.split("/timeline")[-1].strip()
            return self.post[request_name] if request_name in self.post.keys() else ""


class TodoProjectNameTestCase(unittest.TestCase):

    def test_timeline_with_empty_post(self):
        network = IGREC()

        timeline = network.command("Alice /timeline Alice")

        self.assertEqual("", timeline)

    def test_alice_post_bob_read(self):
        # Given
        network = IGREC()
        timeline = network.command("Alice /post What a wonderful day !")

        # When
        timeline = network.command("Bob /timeline Alice")

        # Then
        self.assertEqual("What a wonderful day !", timeline)

    def test_bob_post_alice_read(self):
        # Given
        network = IGREC()
        timeline = network.command("Bob /post What a wonderful day !")

        # When
        timeline = network.command("Bob /timeline Alice")

        # Then
        self.assertEqual("", timeline)
