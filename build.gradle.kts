plugins {
    alias(libs.plugins.kotlin)
    alias(libs.plugins.kotlinxSerialization)
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(libs.kotlinxSerializationJson)
    implementation(libs.bundles.ktor)
    testImplementation(libs.ktor.mock)
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