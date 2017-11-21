# DHS Form G-28 System

## Project Goals
To build a suite of Docker Microservices, and an associated User Interface, for capturing data from the DHS Form G-28 in a modern UI, and for demonstrating a fully automated CI/CD Pipeline and Enterprise Deployment System.

- Project Start: 11/21/2017

## UI Module
### Environment Notes
- Angular CLI: 1.5.3
- Node: 6.11.2
- OS: win32 x64
- Angular: 5x

### Running UI For Development
1.  cd UI
1.  ng serve --open

### Building and Running UI in Docker
1.  cd UI
1.  ng build
1.  docker build -t g28form .
1.  docker run -p 8000:80 g28form