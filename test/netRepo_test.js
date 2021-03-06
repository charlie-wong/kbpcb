const { expect } = require('chai');

const { instance } = require('../src/netRepo');

describe('NetRepo', () => {
  describe('#instance', () => {
    it('returns instance', () => {
      expect(instance).to.haveOwnProperty('nets');
    });
  });

  describe('with some items', () => {
    let netRepo;

    beforeEach(() => {
      netRepo = instance;
      netRepo.clear();
      netRepo.add('One');
      netRepo.add('Two');
      netRepo.add('Three');
    });

    describe('#array', () => {
      it('returns array representation', () => {
        expect(netRepo.array.length).to.eql(6);
      });

      it('returns items', () => {
        expect(netRepo.array[3]).to.eql('One');
        expect(netRepo.array[4]).to.eql('Two');
        expect(netRepo.array[5]).to.eql('Three');
      });
    });

    describe('#indexOf', () => {
      it('returns the index of a given net', () => {
        expect(netRepo.indexOf('One')).to.eql(3);
      });
    });

    describe('#format', () => {
      it('returns formatted net', () => {
        expect(netRepo.format('One')).to.eql('(net 3 "One")');
      });
    });
  });
});
