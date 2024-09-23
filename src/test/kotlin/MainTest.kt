import app.cash.turbine.test
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals

class MainTest {
    @Test
    fun initial_value_should_be_zero() = runTest {
        val counter = Counter()
        counter.state.test {
            assertEquals(0, awaitItem())
            expectNoEvents()
        }
    }

    @Test
    fun increment_action_should_add_one_to_the_value() = runTest {
        val counter = Counter()
        counter.state.test {
            assertEquals(0, awaitItem())
            counter.dispatch(Counter.Action.Increment())
            assertEquals(1, awaitItem())
            counter.dispatch(Counter.Action.Increment())
            assertEquals(2, awaitItem())
            expectNoEvents()
        }
    }

    @Test
    fun decrement_action_should_substract_one_to_the_value() = runTest {
        // Given
        val counter = Counter()
        initToTwo(counter)
        // When
        counter.dispatch(Counter.Action.Decrement)
        // Then
        counter.state.test {
            assertEquals(1, awaitItem())
            expectNoEvents()
        }
    }

    @Test
    fun `should not decrement below 0`() = runTest {
        val counter = Counter()
        counter.dispatch(Counter.Action.Decrement)
        counter.state.test {
            assertEquals(0, awaitItem())
            expectNoEvents()
        }
    }

    @Test
    fun increment_action_should_add_step_to_the_value() = runTest {
        val counter = Counter()
        counter.state.test {
            assertEquals(0, awaitItem())
            counter.dispatch(Counter.Action.Increment(2))
            assertEquals(2, awaitItem())
            counter.dispatch(Counter.Action.Increment(3))
            assertEquals(5, awaitItem())
            expectNoEvents()
        }
    }


    private fun initToTwo(counter: Counter) {
        counter.dispatch(Counter.Action.Increment())
        counter.dispatch(Counter.Action.Increment())
    }
}

class Counter {

    private val internalState = MutableStateFlow(0)
    val state: StateFlow<Int> = internalState.asStateFlow()

    fun dispatch(action: Action) {
        when (action) {
            is Action.Increment -> internalState.update { it + action.step }
            Action.Decrement -> internalState.update { (it - 1).coerceAtLeast(0) }
        }
    }

    sealed interface Action {
        data class Increment(val step: Int=1) : Action
        data object Decrement : Action
    }

}


/*
flux facebook centralize data workflow
    -> react / redux
    -> vue / vuex+pinia
    -> angular / ngrx
 */