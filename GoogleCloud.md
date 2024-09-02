# Goggle Cloud

## Connect to Google Cloud VM

````zsh
- Whole command

    gcloud compute ssh --project=mood-tracker-up --zone=europe-central2-a moodtracker-vm


- If you have set the google cloud configuration

    gcloud compute ssh moodtracker-vm


- Configure the project and the compute/region

    gcloud config set project [PROJECT_ID]
    gcloud config set compute/region [REGION]

- See the configuration list

    gcloud config list
```KT

# Docker

## Build new Docker image

```zsh
docker build -t moodtracker-api .
````

## Run new container with new image

If you say 80:3000, you don't need any additional port in the url

```zsh
sudo docker run -d -p 80:3000 moodtracker-api
```

## Watch running containers

```zsh
sudo docker ps
```

## Start/Stop the container

```zsh
sudo docker stop CONTAINER_ID_OR_NAME

sudo docker start CONTAINER_ID_OR_NAME
```

## Remove container

```zsh
sudo docker rm CONTAINER_ID_OR_NAME
```

## Check for possible causes of SSH connectivity issues and get recommendations

```zsh
gcloud compute ssh moodtracker-vm --project=mood-tracker-up --zone=europe-central2-a --troubleshoot
```

## Investigate an IAP tunneling issue

```zsh
gcloud compute ssh moodtracker-vm --project=mood-tracker-up --zone=europe-central2-a --troubleshoot --tunnel-through-iap
```
