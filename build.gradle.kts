plugins {
    alias(libs.plugins.kotlin)
    alias(libs.plugins.kotlinxSerialization)
}

group = "org.kodein.kata"

repositories {
    mavenCentral()
}

dependencies {
    implementation(libs.kotlinxSerializationJson)
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(17)
}
