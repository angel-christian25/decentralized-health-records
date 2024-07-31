/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { MyAssetContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('MyAssetContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new MyAssetContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"my asset 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"my asset 1002 value"}'));
    });

    describe('#healthRecordExists604', () => {

        it('should return true if health record exists', async () => {
            await contract.healthRecordExists604(ctx, '1001').should.eventually.be.true;
        });

        it('should return false if health record does not exist', async () => {
            await contract.healthRecordExists604(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createHealthRecord604', () => {

        it('should create a health record', async () => {
            await contract.createHealthRecord604(ctx, '1003', 'my asset 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"my asset 1003 value"}'));
        });

        it('should throw an error for a health record that already exists', async () => {
            await contract.createHealthRecord604(ctx, '1001', 'myvalue').should.be.rejectedWith(/The my asset 1001 already exists/);
        });

    });

    describe('#readMyAsset604', () => {

        it('should return a my asset', async () => {
            await contract.readMyAsset604(ctx, '1001').should.eventually.deep.equal({ value: 'my asset 1001 value' });
        });

        it('should throw an error for a my asset that does not exist', async () => {
            await contract.readMyAsset604(ctx, '1003').should.be.rejectedWith(/The my asset 1003 does not exist/);
        });

    });

    describe('#updateMyAsset604', () => {

        it('should update a my asset', async () => {
            await contract.updateMyAsset604(ctx, '1001', 'my asset 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"my asset 1001 new value"}'));
        });

        it('should throw an error for a my asset that does not exist', async () => {
            await contract.updateMyAsset604(ctx, '1003', 'my asset 1003 new value').should.be.rejectedWith(/The my asset 1003 does not exist/);
        });

    });

    describe('#deleteMyAsset604', () => {

        it('should delete a my asset', async () => {
            await contract.deleteMyAsset604(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a my asset that does not exist', async () => {
            await contract.deleteMyAsset604(ctx, '1003').should.be.rejectedWith(/The my asset 1003 does not exist/);
        });

    });

});
