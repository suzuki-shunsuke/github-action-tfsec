resource "null_resource" "foo" {}

resource "aws_cloudfront_distribution" "bad_example" {
  default_cache_behavior {
    viewer_protocol_policy = "allow-all"
  }
}
