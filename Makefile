build:
	docker build -t fp_frontend .

run: 
	docker run fp_frontend --attach --rm 