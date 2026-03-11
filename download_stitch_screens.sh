#!/bin/bash
set -e

DIR="/Users/akshaypatil/Projects/habit-squad/stitch_screens"
mkdir -p "$DIR"

echo "Downloading Onboarding Step 1..."
curl -sL --max-time 60 'https://lh3.googleusercontent.com/aida/AOfcidU7fLge-Y5swgBuZ6BGM5MMVxHccATr1ykDPYJh0pP-NqVTF_wWCQlZ1iY3PjKEYJ2WwE1Oo_348JwhBRlbhwcRFBJeY07EjJPAvXZNJ7Ln8Na-hFdOaf4zzayRAu3P8zU5duJ7J3awXgViwwiyNNS0Ph-nN8zMGQA9EbfGFh7i1V9FildafO51ftCCSFE4uo1JE-hTlRaMAk9mt5oUlFGOGuggSGXKEOX9uian7Gt6VjzKpuA-Fa6U8w' -o "$DIR/onboarding_step_1.png"
curl -sL --max-time 60 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2MxNmVhMjEzYTJkNjRiMjdhM2Q3YTQ2NzM5MjM3MjM5EgsSBxCcpNzHrB8YAZIBIwoKcHJvamVjdF9pZBIVQhM0OTMxNDg1NDU1MDMzMDczODYx&filename=&opi=89354086' -o "$DIR/onboarding_step_1.html"

echo "Downloading Onboarding Step 3..."
curl -sL --max-time 60 'https://lh3.googleusercontent.com/aida/AOfcidXEOeVLLxMEsa3C_jSD8qPQac4bGsKYesGwvRbBUn60AHltorHjIQo2E6leXbB9y6aQ_RZ-oNaPNoQv75XXvJ9f_LWX3C_z9lZ2RA_qWDYiJrLVBUMyKZskUGF-3xy4KteFDbD7dOmeUeDGhN3kn7u0SCdq2VFfYtVwIIxBa5VCtRcrzFCxm-T0PAHq_v8otih_7wkwKSW9tDJfRV9cdDsGRN11kHfcfbKHryMjDEVmzS2uvJ67H0AL9g' -o "$DIR/onboarding_step_3.png"
curl -sL --max-time 60 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQ5NGQ5ZWUzZjUzMDQxODdhNDcwN2U4YzRiMmI1OGQ5EgsSBxCcpNzHrB8YAZIBIwoKcHJvamVjdF9pZBIVQhM0OTMxNDg1NDU1MDMzMDczODYx&filename=&opi=89354086' -o "$DIR/onboarding_step_3.html"

echo "Downloading Home Dashboard..."
curl -sL --max-time 60 'https://lh3.googleusercontent.com/aida/AOfcidW5tjJ_kSt8dg1v1e2HNos0MQLRCoiGbpdYqYQykQXvrWxEjnSerYrD5GwPfJGjEhUXgvqaxdaNBxejXwhPJnLb3EK2RKgYigTRfmrTtvrFvIAXeN6C-X5Sr1sYA_mcUNGMHIByRFQGuZz9iAviOvkp7HZd0i2s3T7i1Wrg30maGAiB7t4186CHItwQZQdjczSwLWvcnpIwx72TuTaqv7MdZUs5zbo53Spdl-Gy__ZodGgQq-FFu0JE4w' -o "$DIR/home_dashboard.png"
curl -sL --max-time 60 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzgwMzA5Y2Q4ZWZiYjQ4YjE5YWQzN2E4NGYxYWVkZTg3EgsSBxCcpNzHrB8YAZIBIwoKcHJvamVjdF9pZBIVQhM0OTMxNDg1NDU1MDMzMDczODYx&filename=&opi=89354086' -o "$DIR/home_dashboard.html"

echo "Downloading Register..."
curl -sL --max-time 60 'https://lh3.googleusercontent.com/aida/AOfcidUecNLGAXLoua9IzzLMW7rkp4dmm68pQy4hkqF1x4lGfPXe6sFVaqPUshdInK70PKAEkCc8482v8CkIsYJLcuKlD8OTgvzhNL8eZLH7RX0eRUqVW6s_df_AMmf6OYhWPx1YW4UcN0hP1jmMFQ4n8iGGIpr2r_CYsNbVnG0cR25mFlbww0hCoHNiIaD6vcuccd_GdeLbAJneWVEVbyu6GfFQzo7hz9NoWYbWJCVoCQmSqF5pNwKJgUm5Hw' -o "$DIR/register.png"
curl -sL --max-time 60 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Y0ODM5OTY2YmNkNTRhYmNiOGI0NjllN2M4OWYyY2E4EgsSBxCcpNzHrB8YAZIBIwoKcHJvamVjdF9pZBIVQhM0OTMxNDg1NDU1MDMzMDczODYx&filename=&opi=89354086' -o "$DIR/register.html"

echo "Downloading Login..."
curl -sL --max-time 60 'https://lh3.googleusercontent.com/aida/AOfcidXGDurHLdjejtDuixMQTPrv2kwQIPongwuGFNpqf8oCatrEUaSgw879z_LquN6GU7n5E9__nmY6-1KNrA5ECmJxoiwxkBTa9ZjUylm0RK5_MKD0nEcv0uknKdeMzV15Vaqn7v21w8cgjY_ii40SA8AaNEDNoepjF4i0m-LnW7jTBO8OQHgYbAKIjn1HZMVYodOrOAUUwvZ9gKFGhdk1kRCPKFUba0DG_LQRaXmwbNWitBc6TbJAA017LEA' -o "$DIR/login.png"
curl -sL --max-time 60 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2U4MDNhNDBhYTY1NzQyNzlhNmMwNWFmMzNiMDExZmZkEgsSBxCcpNzHrB8YAZIBIwoKcHJvamVjdF9pZBIVQhM0OTMxNDg1NDU1MDMzMDczODYx&filename=&opi=89354086' -o "$DIR/login.html"

echo "Downloading Onboarding Step 2..."
curl -sL --max-time 60 'https://lh3.googleusercontent.com/aida/AOfcidWOjJA3BbFhRxDfjd4vKIXEjrorQ8ZEdULHMdfao3USsBd18xtYE0D-e668kqdXakMkM3ClkUpqpXRswudfu6NJunjBn3xzxgxW3dfzo0KaVFigLdrv5mPg_eXOHNmQrrS9S0fm6l4vB5AjjzWv1cmzwIRtSbkpB1YUCfZ0uzIT-dBc8pz2YUI61XaqBDdTmXAOFOagGVLPgowUXP7bm9DfoSgpoxr7Vah8kc2FC1pOBBJzpoSU23Le1V8' -o "$DIR/onboarding_step_2.png"
curl -sL --max-time 60 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2QyZjNiOTk2NDc4MzRhM2E4Yjc5ODQ3ZWE2YWI4ZjNjEgsSBxCcpNzHrB8YAZIBIwoKcHJvamVjdF9pZBIVQhM0OTMxNDg1NDU1MDMzMDczODYx&filename=&opi=89354086' -o "$DIR/onboarding_step_2.html"

echo "All complete!"
