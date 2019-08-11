/**
 * This client was automatically generated by Segment Typewriter. ** Do Not Edit **
 */

/**
 * Ajv is a peer dependency for development builds. It's used to apply run-time validation
 * to message payloads before passing them on to the underlying analytics instance.
 *
 * Note that the production bundle does not depend on Ajv.
 *
 * You can install it with: `npm install --save-dev ajv`.
 */
import Ajv from 'ajv'
import * as Segment from './segment'

export interface CustomViolationHandler {
	'regex property': string
}
export interface DefaultViolationHandler {
	'regex property': string
}
export interface EveryNullableOptionalType {
	/**
	 * Optional any property
	 */
	'optional any'?: any | null
	/**
	 * Optional array property
	 */
	'optional array'?: any[] | null
	/**
	 * Optional boolean property
	 */
	'optional boolean'?: boolean | null
	/**
	 * Optional integer property
	 */
	'optional int'?: number | null
	/**
	 * Optional number property
	 */
	'optional number'?: number | null
	/**
	 * Optional object property
	 */
	'optional object'?: Record<string, any> | null
	/**
	 * Optional string property
	 */
	'optional string'?: string | null
	/**
	 * Optional string property with a regex conditional
	 */
	'optional string with regex'?: string | null
}
export interface EveryNullableRequiredType {
	/**
	 * Required any property
	 */
	'required any': any | null
	/**
	 * Required array property
	 */
	'required array': any[] | null
	/**
	 * Required boolean property
	 */
	'required boolean': boolean | null
	/**
	 * Required integer property
	 */
	'required int': number | null
	/**
	 * Required number property
	 */
	'required number': number | null
	/**
	 * Required object property
	 */
	'required object': Record<string, any> | null
	/**
	 * Required string property
	 */
	'required string': string | null
	/**
	 * Required string property with a regex conditional
	 */
	'required string with regex': string | null
}
export interface EveryOptionalType {
	/**
	 * Optional any property
	 */
	'optional any'?: any | null
	/**
	 * Optional array property
	 */
	'optional array'?: any[]
	/**
	 * Optional boolean property
	 */
	'optional boolean'?: boolean
	/**
	 * Optional integer property
	 */
	'optional int'?: number
	/**
	 * Optional number property
	 */
	'optional number'?: number
	/**
	 * Optional object property
	 */
	'optional object'?: Record<string, any>
	/**
	 * Optional string property
	 */
	'optional string'?: string
	/**
	 * Optional string property with a regex conditional
	 */
	'optional string with regex'?: string
}
export interface EveryRequiredType {
	/**
	 * Required any property
	 */
	'required any': any | null
	/**
	 * Required array property
	 */
	'required array': any[]
	/**
	 * Required boolean property
	 */
	'required boolean': boolean
	/**
	 * Required integer property
	 */
	'required int': number
	/**
	 * Required number property
	 */
	'required number': number
	/**
	 * Required object property
	 */
	'required object': Record<string, any>
	/**
	 * Required string property
	 */
	'required string': string
	/**
	 * Required string property with a regex conditional
	 */
	'required string with regex': string
}
export interface UniverseCharactersItemItem {
	/**
	 * The character's name.
	 */
	name: string
}
export interface NestedArrays {
	/**
	 * All known characters from each universe.
	 */
	universeCharacters: UniverseCharactersItemItem[][]
}
export interface SubterraneanLab {
	"jerry's memories"?: any[]
	"morty's memories"?: any[]
	"summer's contingency plan"?: string
}
export interface Tunnel {
	'subterranean lab': SubterraneanLab
}
export interface Garage {
	tunnel: Tunnel
}
export interface NestedObjects {
	garage: Garage
}
export interface PropertiesCollided {
	'Property Collided': string
	property_collided: string
}
export interface OccupantsItem {
	/**
	 * The name of this occupant.
	 */
	name: string
}
export interface Universe {
	/**
	 * The common name of this universe.
	 */
	name: string
	/**
	 * The most important occupants in this universe.
	 */
	occupants: OccupantsItem[]
}
export interface PropertyObjectNameCollision1 {
	universe?: Universe
}
export interface OccupantsItem1 {
	/**
	 * The name of this occupant.
	 */
	name: string
}
export interface Universe1 {
	/**
	 * The common name of this universe.
	 */
	name: string
	/**
	 * The most important occupants in this universe.
	 */
	occupants: OccupantsItem1[]
}
export interface PropertyObjectNameCollision2 {
	universe?: Universe1
}
export interface PropertySanitized {
	'0000---terrible-property-name~!3': string
}
export interface ObjectItem {
	name?: string
}
export interface SimpleArrayTypes {
	any?: any[]
	boolean?: boolean[]
	integer?: number[]
	nullable?: string[]
	number?: number[]
	object?: ObjectItem[]
	string?: string[]
}
export interface UnionType {
	universe_name: string | number | null
}

export type ViolationHandler = (
	message: Record<string, any>,
	violations: Ajv.ErrorObject[]
) => void

export const defaultValidationErrorHandler: ViolationHandler = (
	message,
	violations
) => {
	const msg = JSON.stringify(
		{
			type: 'Typewriter JSON Schema Validation Error',
			description:
				`You made an analytics call (${
					message.event
				}) using Typewriter that doesn't match the ` + 'Tracking Plan spec.',
			errors: violations,
		},
		undefined,
		2
	)

	console.warn(msg)
}

let onViolation = defaultValidationErrorHandler

let analytics: () => SegmentAnalytics.AnalyticsJS | undefined = () => {
	return window.analytics
}

/** Options to customize the runtime behavior of a Typewriter client. */
export interface TypewriterOptions {
	/**
	 * Underlying analytics instance where analytics calls are forwarded on to.
	 * Defaults to window.analytics.
	 */
	analytics?: SegmentAnalytics.AnalyticsJS
	/**
	 * Handler fired when if an event does not match its spec. Returns a boolean
	 * indicating if the message should still be sent to Segment. This handler
	 * does not fire in production mode, because it requires inlining the full
	 * JSON Schema spec for each event in your Tracking Plan.
	 *
	 * By default, it will throw errors if NODE_ENV = "test" so that tests will fail
	 * if a message does not match the spec. Otherwise, errors will be logged to stderr.
	 */
	onViolation?: ViolationHandler
}

/**
 * Updates the run-time configuration of this Typewriter client.
 */
export function setTypewriterOptions(options: TypewriterOptions) {
	analytics = options.analytics
		? () => options.analytics || window.analytics
		: analytics
	onViolation = options.onViolation || onViolation
}

/**
 * Validates a message against a JSON Schema using Ajv. If the message
 * is invalid, the `onViolation` handler will be called.
 */
function validateAgainstSchema(message: Record<string, any>, schema: object) {
	const ajv = new Ajv({ schemaId: 'auto', allErrors: true, verbose: true })
	ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
	ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'))

	if (!ajv.validate(schema, message) && ajv.errors) {
		onViolation(message, ajv.errors)
	}
}

/**
 * Helper to attach metadata on Typewriter to outbound requests.
 * This is used for attribution and debugging by the Segment team.
 */
function withTypewriterContext(message: Segment.Options = {}): Segment.Options {
	return {
		...message,
		context: {
			...(message.context || {}),
			typewriter: {
				language: 'typescript',
				version: '7.0.0',
			},
		},
	}
}

/**
 * Fires a '42_--terrible==\\"event\'++name~!3' track call.
 */
export function I42TerribleEventName3(
	props?: Record<string, any>,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: '42_--terrible==\\"event\'++name~!3',
	}
	const message = {
		event: '42_--terrible==\\"event\'++name~!3',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'42_--terrible==\\"event\'++name~!3',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Analytics Instance Missing' track call.
 */
export function analyticsInstanceMissing(
	props?: Record<string, any>,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Analytics Instance Missing',
	}
	const message = {
		event: 'Analytics Instance Missing',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Analytics Instance Missing',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Analytics Instance Missing Threw Error' track call.
 */
export function analyticsInstanceMissingThrewError(
	props?: Record<string, any>,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Analytics Instance Missing Threw Error',
	}
	const message = {
		event: 'Analytics Instance Missing Threw Error',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Analytics Instance Missing Threw Error',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Custom Violation Handler' track call.
 */
export function customViolationHandler(
	props: CustomViolationHandler,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					'regex property': {
						description: '',
						pattern: 'Lawyer Morty|Evil Morty',
						type: 'string',
					},
				},
				required: ['regex property'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Custom Violation Handler',
	}
	const message = {
		event: 'Custom Violation Handler',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Custom Violation Handler',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Custom Violation Handler Called' track call.
 */
export function customViolationHandlerCalled(
	props?: Record<string, any>,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Custom Violation Handler Called',
	}
	const message = {
		event: 'Custom Violation Handler Called',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Custom Violation Handler Called',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Default Violation Handler' track call.
 */
export function defaultViolationHandler(
	props: DefaultViolationHandler,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					'regex property': {
						description: '',
						pattern: 'Lawyer Morty|Evil Morty',
						type: 'string',
					},
				},
				required: ['regex property'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Default Violation Handler',
	}
	const message = {
		event: 'Default Violation Handler',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Default Violation Handler',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Default Violation Handler Called' track call.
 */
export function defaultViolationHandlerCalled(
	props?: Record<string, any>,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Default Violation Handler Called',
	}
	const message = {
		event: 'Default Violation Handler Called',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Default Violation Handler Called',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Empty Event' track call.
 */
export function emptyEvent(
	props?: Record<string, any>,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Empty Event',
	}
	const message = {
		event: 'Empty Event',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Empty Event',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Event Collided' track call.
 */
export function eventCollided(
	props?: Record<string, any>,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Event Collided',
	}
	const message = {
		event: 'Event Collided',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Event Collided',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Every Nullable Optional Type' track call.
 */
export function everyNullableOptionalType(
	props?: EveryNullableOptionalType,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		properties: {
			context: {},
			properties: {
				properties: {
					'optional any': {
						description: 'Optional any property',
					},
					'optional array': {
						description: 'Optional array property',
						type: ['array', 'null'],
					},
					'optional boolean': {
						description: 'Optional boolean property',
						type: ['boolean', 'null'],
					},
					'optional int': {
						description: 'Optional integer property',
						type: ['integer', 'null'],
					},
					'optional number': {
						description: 'Optional number property',
						type: ['number', 'null'],
					},
					'optional object': {
						description: 'Optional object property',
						properties: {},
						required: [],
						type: ['object', 'null'],
					},
					'optional string': {
						description: 'Optional string property',
						type: ['string', 'null'],
					},
					'optional string with regex': {
						description: 'Optional string property with a regex conditional',
						pattern: 'Evil Morty|Lawyer Morty',
						type: ['string', 'null'],
					},
				},
				type: 'object',
			},
			traits: {},
		},
		type: 'object',
		title: 'Every Nullable Optional Type',
	}
	const message = {
		event: 'Every Nullable Optional Type',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Every Nullable Optional Type',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Every Nullable Required Type' track call.
 */
export function everyNullableRequiredType(
	props: EveryNullableRequiredType,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		properties: {
			context: {},
			properties: {
				properties: {
					'required any': {
						description: 'Required any property',
					},
					'required array': {
						description: 'Required array property',
						type: ['array', 'null'],
					},
					'required boolean': {
						description: 'Required boolean property',
						type: ['boolean', 'null'],
					},
					'required int': {
						description: 'Required integer property',
						type: ['integer', 'null'],
					},
					'required number': {
						description: 'Required number property',
						type: ['number', 'null'],
					},
					'required object': {
						description: 'Required object property',
						properties: {},
						required: [],
						type: ['object', 'null'],
					},
					'required string': {
						description: 'Required string property',
						type: ['string', 'null'],
					},
					'required string with regex': {
						description: 'Required string property with a regex conditional',
						pattern: 'Evil Morty|Lawyer Morty',
						type: ['string', 'null'],
					},
				},
				required: [
					'required any',
					'required array',
					'required boolean',
					'required int',
					'required number',
					'required object',
					'required string',
					'required string with regex',
				],
				type: 'object',
			},
			traits: {},
		},
		required: ['properties'],
		type: 'object',
		title: 'Every Nullable Required Type',
	}
	const message = {
		event: 'Every Nullable Required Type',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Every Nullable Required Type',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Every Optional Type' track call.
 */
export function everyOptionalType(
	props?: EveryOptionalType,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		properties: {
			context: {},
			properties: {
				properties: {
					'optional any': {
						description: 'Optional any property',
					},
					'optional array': {
						description: 'Optional array property',
						type: 'array',
					},
					'optional boolean': {
						description: 'Optional boolean property',
						type: 'boolean',
					},
					'optional int': {
						description: 'Optional integer property',
						type: 'integer',
					},
					'optional number': {
						description: 'Optional number property',
						type: 'number',
					},
					'optional object': {
						description: 'Optional object property',
						key: 'optional object',
						properties: {},
						required: [],
						type: 'object',
					},
					'optional string': {
						description: 'Optional string property',
						type: 'string',
					},
					'optional string with regex': {
						description: 'Optional string property with a regex conditional',
						pattern: 'Evil Morty|Lawyer Morty',
						type: 'string',
					},
				},
				type: 'object',
			},
			traits: {},
		},
		type: 'object',
		title: 'Every Optional Type',
	}
	const message = {
		event: 'Every Optional Type',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Every Optional Type',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Every Required Type' track call.
 */
export function everyRequiredType(
	props: EveryRequiredType,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		properties: {
			context: {},
			properties: {
				properties: {
					'required any': {
						description: 'Required any property',
					},
					'required array': {
						description: 'Required array property',
						type: 'array',
					},
					'required boolean': {
						description: 'Required boolean property',
						type: 'boolean',
					},
					'required int': {
						description: 'Required integer property',
						type: 'integer',
					},
					'required number': {
						description: 'Required number property',
						type: 'number',
					},
					'required object': {
						description: 'Required object property',
						key: 'required object',
						properties: {},
						required: [],
						type: 'object',
					},
					'required string': {
						description: 'Required string property',
						type: 'string',
					},
					'required string with regex': {
						description: 'Required string property with a regex conditional',
						pattern: 'Evil Morty|Lawyer Morty',
						type: 'string',
					},
				},
				required: [
					'required any',
					'required array',
					'required boolean',
					'required int',
					'required number',
					'required object',
					'required string',
					'required string with regex',
				],
				type: 'object',
			},
			traits: {},
		},
		required: ['properties'],
		type: 'object',
		title: 'Every Required Type',
	}
	const message = {
		event: 'Every Required Type',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Every Required Type',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Nested Arrays' track call.
 */
export function nestedArrays(
	props: NestedArrays,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					universeCharacters: {
						description: 'All known characters from each universe.',
						items: {
							description: '',
							items: {
								description: '',
								properties: {
									name: {
										description: "The character's name.",
										type: 'string',
									},
								},
								required: ['name'],
								type: 'object',
							},
							type: 'array',
						},
						type: 'array',
					},
				},
				required: ['universeCharacters'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Nested Arrays',
	}
	const message = {
		event: 'Nested Arrays',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Nested Arrays',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Nested Objects' track call.
 */
export function nestedObjects(
	props: NestedObjects,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					garage: {
						description: '',
						properties: {
							tunnel: {
								description: '',
								properties: {
									'subterranean lab': {
										description: '',
										properties: {
											"jerry's memories": {
												description: '',
												type: 'array',
											},
											"morty's memories": {
												description: '',
												type: 'array',
											},
											"summer's contingency plan": {
												description: '',
												type: 'string',
											},
										},
										required: [],
										type: 'object',
									},
								},
								required: ['subterranean lab'],
								type: 'object',
							},
						},
						required: ['tunnel'],
						type: 'object',
					},
				},
				required: ['garage'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Nested Objects',
	}
	const message = {
		event: 'Nested Objects',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Nested Objects',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Properties Collided' track call.
 */
export function propertiesCollided(
	props: PropertiesCollided,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					'Property Collided': {
						description: '',
						type: 'string',
					},
					property_collided: {
						description: '',
						type: 'string',
					},
				},
				required: ['property_collided', 'Property Collided'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Properties Collided',
	}
	const message = {
		event: 'Properties Collided',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Properties Collided',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Property Object Name Collision #1' track call.
 */
export function propertyObjectNameCollision1(
	props?: PropertyObjectNameCollision1,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					universe: {
						description: '',
						properties: {
							name: {
								description: 'The common name of this universe.',
								type: 'string',
							},
							occupants: {
								description: 'The most important occupants in this universe.',
								items: {
									description: '',
									properties: {
										name: {
											description: 'The name of this occupant.',
											type: 'string',
										},
									},
									required: ['name'],
									type: 'object',
								},
								type: 'array',
							},
						},
						required: ['name', 'occupants'],
						type: 'object',
					},
				},
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Property Object Name Collision #1',
	}
	const message = {
		event: 'Property Object Name Collision #1',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Property Object Name Collision #1',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Property Object Name Collision #2' track call.
 */
export function propertyObjectNameCollision2(
	props?: PropertyObjectNameCollision2,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					universe: {
						description: '',
						properties: {
							name: {
								description: 'The common name of this universe.',
								type: 'string',
							},
							occupants: {
								description: 'The most important occupants in this universe.',
								items: {
									description: '',
									properties: {
										name: {
											description: 'The name of this occupant.',
											type: 'string',
										},
									},
									required: ['name'],
									type: 'object',
								},
								type: 'array',
							},
						},
						required: ['name', 'occupants'],
						type: 'object',
					},
				},
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Property Object Name Collision #2',
	}
	const message = {
		event: 'Property Object Name Collision #2',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Property Object Name Collision #2',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Property Sanitized' track call.
 */
export function propertySanitized(
	props: PropertySanitized,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					'0000---terrible-property-name~!3': {
						description: '',
						type: 'string',
					},
				},
				required: ['0000---terrible-property-name~!3'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Property Sanitized',
	}
	const message = {
		event: 'Property Sanitized',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Property Sanitized',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Simple Array Types' track call.
 */
export function simpleArrayTypes(
	props?: SimpleArrayTypes,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					any: {
						description: '',
						items: {
							description: '',
						},
						type: 'array',
					},
					boolean: {
						description: '',
						items: {
							description: '',
							type: 'boolean',
						},
						type: 'array',
					},
					integer: {
						description: '',
						items: {
							description: '',
							type: 'integer',
						},
						type: 'array',
					},
					nullable: {
						description: '',
						items: {
							description: '',
							type: ['string', 'null'],
						},
						type: 'array',
					},
					number: {
						description: '',
						items: {
							description: '',
							type: 'number',
						},
						type: 'array',
					},
					object: {
						description: '',
						items: {
							description: '',
							properties: {
								name: {
									description: '',
									type: 'string',
								},
							},
							required: [],
							type: 'object',
						},
						type: 'array',
					},
					string: {
						description: '',
						items: {
							description: '',
							type: 'string',
						},
						type: 'array',
					},
				},
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Simple Array Types',
	}
	const message = {
		event: 'Simple Array Types',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'Simple Array Types',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
/**
 * Fires a 'Union Type' track call.
 */
export function unionType(
	props: UnionType,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					universe_name: {
						description: '',
						type: ['string', 'null', 'integer'],
					},
				},
				required: ['universe_name'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Union Type',
	}
	const message = {
		event: 'Union Type',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track('Union Type', props || {}, withTypewriterContext(options), callback)
	}
}
/**
 * Fires a 'event_collided' track call.
 */
export function eventCollided1(
	props?: Record<string, any>,
	options?: Segment.Options,
	callback?: Segment.Callback
): void {
	const schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'event_collided',
	}
	const message = {
		event: 'event_collided',
		properties: props || {},
		options,
	}
	validateAgainstSchema(message, schema)

	const a = analytics()
	if (a) {
		a.track(
			'event_collided',
			props || {},
			withTypewriterContext(options),
			callback
		)
	}
}
