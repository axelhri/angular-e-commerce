run:  # Start angular application (local development)
	npm run start

ci:  # Install dependencies
	npm i

c:  # Generate a component
	ng g c

s:  # Generate a service
	ng g s

m:  # Generate a module
	ng g m

i:  # Generate a interface
	ng g i

d:  # Generate a directive
	ng g d

p:  # Generate a pipe
	ng g p

g:  # Generate a guard
	ng g g

lint:  # Check code quality
	npm run lint

fc:  # Check code formatting
	npm run format:check

fix:  # Fix code formatting
	npm run format

test:  # Run unit tests
	npm run test

e2e:  # Run Playwright e2e tests
	npm run e2e
