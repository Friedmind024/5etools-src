"use strict";

class PageFilterVariantRules extends PageFilterBase {
	// region static
	// endregion

	constructor () {
		super();

		this._ruleTypeFilter = new Filter({header: "Rule Type", items: ["O", "V", "VO", "VV", "U"], displayFn: Parser.ruleTypeToFull});
		this._miscFilter = new Filter({
			header: "Miscellaneous",
			items: ["SRD", "Legacy"],
			isMiscFilter: true,
			deselFn: PageFilterBase.defaultMiscellaneousDeselFn.bind(PageFilterBase),
		});
	}

	static mutateForFilters (rule) {
		this._mutateForFilters_commonMisc(rule);

		rule._fRuleType = rule.ruleType || "U";
	}

	addToFilters (rule, isExcluded) {
		if (isExcluded) return;

		this._sourceFilter.addItem(rule.source);
		this._ruleTypeFilter.addItem(rule._fRuleType);
	}

	async _pPopulateBoxOptions (opts) {
		opts.filters = [
			this._sourceFilter,
			this._ruleTypeFilter,
			this._miscFilter,
		];
	}

	toDisplay (values, r) {
		return this._filterBox.toDisplay(
			values,
			r.source,
			r._fRuleType,
			r._fMisc,
		);
	}
}

globalThis.PageFilterVariantRules = PageFilterVariantRules;