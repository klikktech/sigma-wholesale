# Stage 1: Build the application
FROM maven:3.9.9-amazoncorretto-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install -DskipTests

# Stage 2: Run the application
FROM amazoncorretto:17-alpine AS runtime
WORKDIR /app
COPY --from=build /app/target/*.jar ./demo-aws.jar
EXPOSE 8080
CMD ["java", "-jar", "demo-aws.jar"]
