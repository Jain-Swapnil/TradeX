FROM amazoncorretto:17
ADD target/portfolioproject-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8082
ARG DBUSER
ENV DBUSER=$DBUSER
ARG DBPASSWORD
ENV DBPASSWORD=$DBPASSWORD
CMD ["java","-jar","-Dspring.profiles.active=production", "app.jar"]