provider "aws" {
  region = "ap-south-2"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
}

resource "aws_instance" "k3s_master" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.medium"
  key_name               = "agents-jenkins"
  vpc_security_group_ids = ["sg-04b51a64d308eb338"]

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  tags = {
    Name = "k3s-controlplane"
    Role = "master"
  }
}

resource "aws_instance" "k3s_workers" {
  count                  = 2
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.medium"
  key_name               = "agents-jenkins"
  vpc_security_group_ids = ["sg-04b51a64d308eb338"]

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  tags = {
    Name = "k3s-worker-${count.index + 1}"
    Role = "worker"
  }
}

output "master_public_ip" {
  value = aws_instance.k3s_master.public_ip
}
output "worker_public_ips" {
  value = aws_instance.k3s_workers[*].public_ip
}
