// *** WARNING: this file was generated by test. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs, enums } from "../types";

export interface ContainerArgs {
    brightness?: pulumi.Input<enums.ContainerBrightness | undefined>;
    color?: pulumi.Input<enums.ContainerColor | string | undefined>;
    material?: pulumi.Input<string | undefined>;
    size: pulumi.Input<enums.ContainerSize>;
}
