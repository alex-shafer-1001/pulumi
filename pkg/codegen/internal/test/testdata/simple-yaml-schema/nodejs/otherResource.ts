// *** WARNING: this file was generated by test. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "./utilities";

import {Resource} from "./index";

export class OtherResource extends pulumi.ComponentResource {
    /** @internal */
    public static readonly __pulumiType = 'example::OtherResource';

    /**
     * Returns true if the given object is an instance of OtherResource.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is OtherResource {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === OtherResource.__pulumiType;
    }

    public readonly foo!: pulumi.Output<Resource | undefined>;

    /**
     * Create a OtherResource resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: OtherResourceArgs, opts?: pulumi.ComponentResourceOptions) {
        let inputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            inputs["bar"] = args ? args.bar : undefined;
            inputs["foo"] = args ? args.foo : undefined;
        } else {
            inputs["foo"] = undefined /*out*/;
        }
        if (!opts.version) {
            opts = pulumi.mergeOptions(opts, { version: utilities.getVersion()});
        }
        super(OtherResource.__pulumiType, name, inputs, opts, true /*remote*/);
    }
}

/**
 * The set of arguments for constructing a OtherResource resource.
 */
export interface OtherResourceArgs {
    bar?: pulumi.Input<string>[];
    foo?: pulumi.Input<Resource | undefined>;
}
