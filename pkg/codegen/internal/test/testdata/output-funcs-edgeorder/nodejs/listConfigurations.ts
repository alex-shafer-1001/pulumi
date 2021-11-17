// *** WARNING: this file was generated by test. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs, enums } from "./types";
import * as utilities from "./utilities";

/**
 * The list of configurations.
 * API Version: 2020-12-01-preview.
 */
export function listConfigurations(args: ListConfigurationsArgs, opts?: pulumi.InvokeOptions): Promise<ListConfigurationsResult> {
    if (!opts) {
        opts = {}
    }

    if (!opts.version) {
        opts.version = utilities.getVersion();
    }
    return pulumi.runtime.invoke("myedgeorder::listConfigurations", {
        "configurationFilters": args.configurationFilters,
        "customerSubscriptionDetails": args.customerSubscriptionDetails,
        "skipToken": args.skipToken,
    }, opts);
}

export interface ListConfigurationsArgs {
    /**
     * Holds details about product hierarchy information and filterable property.
     */
    configurationFilters: inputs.ConfigurationFilters[];
    /**
     * Customer subscription properties. Clients can display available products to unregistered customers by explicitly passing subscription details
     */
    customerSubscriptionDetails?: inputs.CustomerSubscriptionDetails;
    /**
     * $skipToken is supported on list of configurations, which provides the next page in the list of configurations.
     */
    skipToken?: string;
}

/**
 * The list of configurations.
 */
export interface ListConfigurationsResult {
    /**
     * Link for the next set of configurations.
     */
    readonly nextLink?: string;
    /**
     * List of configurations.
     */
    readonly value: outputs.ConfigurationResponse[];
}

export function listConfigurationsOutput(args: ListConfigurationsOutputArgs, opts?: pulumi.InvokeOptions): pulumi.Output<ListConfigurationsResult> {
    return pulumi.output(args).apply(a => listConfigurations(a, opts))
}

export interface ListConfigurationsOutputArgs {
    /**
     * Holds details about product hierarchy information and filterable property.
     */
    configurationFilters: pulumi.Input<pulumi.Input<inputs.ConfigurationFiltersArgs>[]>;
    /**
     * Customer subscription properties. Clients can display available products to unregistered customers by explicitly passing subscription details
     */
    customerSubscriptionDetails?: pulumi.Input<inputs.CustomerSubscriptionDetailsArgs | undefined>;
    /**
     * $skipToken is supported on list of configurations, which provides the next page in the list of configurations.
     */
    skipToken?: pulumi.Input<string | undefined>;
}
