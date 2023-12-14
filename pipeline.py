import enum


class TestsState:
    NONE = 0
    NO_TESTS = 1
    TESTS_FAILED = 2
    TESTS_PASSED = 3

class DeployState:
    NONE = 0
    NO_DEPLOY = 1
    DEPLOY_SUCCESSFUL = 2
    DEPLOY_FAILED = 3


class Pipeline:
    def __init__(self, config, emailer, log):
        self.config = config
        self.emailer = emailer
        self.log = log

    def run(self, project):

        tests_state = self._analyze_tests(project)

        if tests_state == TestsState.TESTS_FAILED:
            deploy_state = DeployState.NO_DEPLOY
        else:
            deploy_state = self._analyze_deploy(project)

        if self.config.send_email_summary():
            self.log.info("Sending email")
            self.emailer.send(self._get_email_message(tests_state, deploy_state))
        else:
            self.log.info("Email disabled")

    def _get_email_message(self, tests_state, deploy_state):
        if tests_state == TestsState.TESTS_FAILED:
            return "Tests failed"

        if deploy_state == DeployState.DEPLOY_SUCCESSFUL:
            return "Deployment completed successfully"
        else:
            return "Deployment failed"

    def _analyze_deploy(self, project):
        if "success" == project.deploy():
            self.log.info("Deployment successful")
            return DeployState.DEPLOY_SUCCESSFUL
        else:
            self.log.error("Deployment failed")
            return DeployState.DEPLOY_FAILED

    def _analyze_tests(self, project):
        if project.has_tests():
            if "success" == project.run_tests():
                self.log.info("Tests passed")
                return TestsState.TESTS_PASSED
            else:
                self.log.error("Tests failed")
                return TestsState.TESTS_FAILED
        else:
            self.log.info("No tests")
            return TestsState.NO_TESTS
