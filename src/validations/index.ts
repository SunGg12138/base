import * as Joi from 'joi';
import * as config from 'config';

export const addDeployment = Joi.object({
    body: Joi.object({
        type: Joi.string(),
        name: Joi.string().regex(/^[a-z]([0-9a-zA-Z\-]{1,61})?[0-9a-z]$/).required(),
        port: Joi.number().integer().min(1).max(65535).required(),
        namespace: Joi.string().valid(...(config.get('k8s.namespace.list') as string[])).default(config.get('k8s.namespace.default')),
        replicas: Joi.number().integer().min(1).max(10).default(1),
        image: Joi.when('type', {
            is: Joi.string().valid('pigeon'),
            then: Joi.string().default(config.get('k8s.image.pigeon.default')),
            otherwise: Joi.string().required(),
        }),
        resources: Joi.object({
            requests: Joi.object({
                cpu: Joi.string().required(),
                memory: Joi.string().required(),
            }).required(),
            limits: Joi.object({
                cpu: Joi.string().required(),
                memory: Joi.string().required(),
            }).required(),
        }),
        env: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            value: Joi.string().required(),
        })).default([]),
    }).required().unknown(),
}).unknown();

export const deleteDeployment = Joi.object({
    body: Joi.object({
        name: Joi.string().regex(/^[a-z]([0-9a-zA-Z\-]{1,61})?[0-9a-z]$/).required(),
        namespace: Joi.string().valid(...(config.get('k8s.namespace.list') as string[])).default(config.get('k8s.namespace.default')),
    }).required().unknown(),
}).unknown();
