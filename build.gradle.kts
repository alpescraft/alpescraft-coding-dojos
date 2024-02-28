plugins {
    alias(libs.plugins.kotlin)
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(libs.coroutines.core)
    testImplementation(libs.coroutines.test)
    testImplementation(libs.turbine)
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(17)
}