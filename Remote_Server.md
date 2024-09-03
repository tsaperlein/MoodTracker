# Create Remote Server

## Step 1: Set Up Google Cloud Project

### 1. Log in to Google Cloud Console: Go to the Google Cloud Console.

### 2. Create a New Project:

- Click on the project drop-down in the top navigation bar.
- Click “New Project” and provide a name and billing account.
- Select the new project from the project selector.

## Step 2: Create a Virtual Machine (VM) in Google Compute Engine

### 1. Navigate to Compute Engine:

In the Google Cloud Console, navigate to "Compute Engine" > "VM instances".
Click "Create instance" to start setting up your virtual machine.

### 2. Configure the VM Instance:

- **Name:** Give your VM a name (e.g., `docker-vm`).
- **Region and Zone:** Choose the region and zone where you want the VM to be located.
- **Machine Configuration:** Select the machine type (e.g., e2-medium or n1-standard-1), which depends on your performance needs.
- **Boot Disk:**
  - Click on "Change" under "Boot Disk".
  - Choose an OS image, such as Ubuntu 20.04 LTS or Debian. Ubuntu is popular for Docker installations.
  - Optionally, adjust the disk size depending on your storage needs.

### 3. Allow HTTP/HTTPS Traffic:

Make sure to check the boxes for "Allow HTTP traffic" and "Allow HTTPS traffic" under the firewall settings.

### 4. Create the VM:

Click "Create" to start the VM. It will take a moment for the instance to be created and started.

## Step 3: Connect to Your VM Instance

### 1. SSH into the VM:

- Once the VM is running, click the "SSH" button next to your instance in the Compute Engine dashboard. This will open an SSH session in your browser.

## Step 4: Install Docker on the VM

## Ubuntu

### 1. Update the Package List:

- Run the following commands to update your package list and install prerequisites:

  ```bash
  sudo apt-get update
  sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
  ```

### 2. Add Docker’s Official GPG Key:

- Run:

  ```bash
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  ```

### 3. Set Up the Stable Repository:

- Run:

  ```bash
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  sudo apt-get update
  ```

### 4. Install Docker:

- Run:

  ```bash
  sudo apt-get install docker-ce
  ```

## Debian

### 1. Update the Package List:

- Update your package index:

  ```bash
  sudo apt-get update
  ```

### 2. Install Docker:

- Run:

  ```bash
  sudo apt-get install docker.io
  ```

### 3. Start and enable Docker:

- Run:

  ```bash
  sudo systemctl start docker
  sudo systemctl enable docker
  ```

---

### 5. Verify Docker Installation:

- Check if Docker is installed correctly by running:

  ```bash
  sudo docker --version
  ```

- You should see the Docker version output.

### 6. (Optional) Manage Docker as a Non-Root User:

- If you want to run Docker without sudo, add your user to the docker group:

  ```bash
  sudo usermod -aG docker $USER
  ```

- Log out and log back in to apply the group membership.

## Step 5: Transfer your Docker image from your local machine to your virtual machine (VM) via SSH

### Step 1: Save the Docker Image as a Tar File

First, save the Docker image you built into a tar file on your local machine (via `terminal`):

#### 1. List your Docker images to find the one you want to transfer:

```bash
docker images
```

#### 2. Save the Docker image as a tar file:

```bash
docker save -o my-image.tar your-image-name:your-tag
```

- Replace `your-image-name:your-tag` with the name and tag of your Docker image.
- Replace `my-image.tar` with the desired name of the tar file.
  (ex. `docker save -o moodtracker-api.tar moodtracker-api`)

### Step 2: Transfer the Tar File to the Virtual Machine

You can use `scp` (Secure Copy Protocol) to transfer the tar file to your VM:

#### 1. Transfer the tar file using `scp`:

```bash
scp my-image.tar your-username@your-vm-ip:/path/to/destination/
```

- Replace `your-username` with your VM's SSH username.
- Replace `your-vm-ip` with the IP address of your VM.
- Replace `/path/to/destination/` with the directory on the VM where you want to store the tar file.

  (ex. `scp ./moodtracker-api.tar tsaperlein@34.118.22.178:~/`)

### Step 3: Load the Docker Image on the Virtual Machine

Once the tar file is on the VM, you need to load the Docker image into Docker on the VM:

#### 1. SSH into your VM:

```bash
ssh your-username@your-vm-ip
```

(ex. `ssh tsaperlein@34.118.22.178`)

---

### "Permission denied (publickey)"

The error message Permission denied (publickey) indicates that SSH is unable to authenticate with the Google Cloud VM because it can't find a valid SSH key that matches what the server expects.

### Add Your SSH Key to Google Cloud:

#### 1. Check Existing SSH Keys:

- On your local machine, check if you have an existing SSH key:

```bash
ls ~/.ssh/id_rsa.pub
```

- If you have a different key name, adjust accordingly. To see it run:

```bash
cat ~/.ssh/id_rsa.pub
```

( Key example: `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD3... user@hostname`)

- If you don’t have an SSH key, generate one:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

- Press Enter to accept the default file location, and set a passphrase if desired.

#### 2. Add the SSH Key to the VM:

- Go to the Google Cloud Console:
- Navigate to **Compute Engine > Metadata**.
- Go to the **SSH Keys** tab.
- Click **Edit** and then **Add SSH Key**.
- Paste the contents of your `~/.ssh/id_rsa.pub` file into the text box.
- Click **Save**.

### Host key verification failed

#### 1. Open your known_hosts file:

The error message indicates that the offending entry is on line 8. You can either manually edit the file or use the ssh-keygen command to remove it.

To manually edit:

```bash
nano /Users/tsaperlein/.ssh/known_hosts
```

- Then, remove the line corresponding to the IP `34.116.179.60`.
  (ex.

  34.116.179.60 ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIChFK/mDjIElqo0dRz77tYmnBptL+OijZ/MTt1mqzGqM

  34.116.179.60 ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCxYZVV7RBHnqxMRX6snVZrYWjNw8Llnk4quXdns3cEXbfrRAKw4bh6+4ea7UH9Q2jbz06LnZwxPziz/SUO$)

#### 2. Remove the offending key using ssh-keygen:

- Alternatively, you can use the following command to remove the specific entry:

```bash
ssh-keygen -R 34.116.179.60
```

- This will remove the old key for the IP address 34.116.179.60 from the known_hosts file.

#### 3: Reconnect to the Server

- After removing the old host key, try connecting to the server again with scp or ssh. The first time you connect, you’ll be prompted to accept the new host key:

```bash
scp ./moodtracker.tar tsaperlein@34.116.179.60:~/
```

---

#### 2. Load the Docker image from the tar file:

```bash
docker load -i /path/to/destination/my-image.tar
```

- Replace `/path/to/destination/my-image.tar` with the actual path to your tar file on the VM. Usually it is `~/my-image.tar`

#### 3. Verify that the image was loaded:

```bash
docker images
```

- You should see the image listed along with any other images on the VM.

## Step 4: Run the Docker Container on the Virtual Machine

Now that the image is loaded, you can run it on your VM:

### 1. Run the Docker container:

```bash
docker run -d -p 80:80 your-image-name:your-tag
```

- Replace `your-image-name:your-tag` with the appropriate name and tag of your Docker image.
- Replace the second 80 with the PORT that you have set in your server (ex. `3000`)

### 2. Check Docker Logs

- If the browser cannot connect, you might want to check the logs of your Docker container to see if there are any issues:

```bash
docker logs [container-id]
```

- Replace `[container-id]` with the actual container ID (e.g., `c24291d9f03b`).

### 3. Test the server

- Open your web browser and enter the external IP address of your VM:

```arduino
http://your-vm-ip-address
```

- You should now see your application’s output in the browser.

- Test it through the terminal by running:

```bash
curl http://your-vm-ip-address
or
curl http://your-vm-ip-address:80
```

# Errors

## ssh: Could not resolve hostname moodtracker-api-vm: nodename nor servname provided, or not known

```bash
ssh tsaperlein@moodtracker-api-vm
```

- Use the external IP address of your Google Cloud VM directly

  (ex. `ssh tsaperlein@34.118.22.178`)

### 1. Check if the Hostname is Configured:

- Open the file using a text editor with sudo privileges:

```bash
sudo nano /etc/hosts
```

- Add an entry like:

```bash
your-vm-ip moodtracker-api-vm
```

- Save the file and try SSHing using the hostname again.

### 2. Ensure Correct Project and Zone:

- If you have multiple Google Cloud projects or instances in different zones, make sure you're working within the correct project and zone. If necessary, adjust your gcloud settings:

```bash
gcloud config set project [PROJECT_ID]
gcloud config set compute/zone [ZONE]
```

- Example

```bash
gcloud config set project mood-tracker-up
gcloud config set compute/zone europe-central2-a
```
