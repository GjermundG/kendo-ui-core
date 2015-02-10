(function() {
    var StaticList = kendo.ui.StaticList,
    element;

    module("kendo.ui.StaticList rendering", {
        setup: function() {
            kendo.ns = "kendo-";
            element = $("<ul></ul>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            element.data("kendoStaticList").destroy();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.ns = "";
        }
    });

    test("kendoStaticList renders data source items using template", function() {
        var list = new StaticList(element, {
            dataSource: ["foo"],
            template: "#:data#"
        });

        list.dataSource.read();

        var li = element.children(":first");

        equal(li.html(), "foo");
        equal(li.attr("tabindex"), -1);
        equal(li.attr("role"), "option");
        equal(li.attr("unselectable"), "on");
        equal(li.attr("class"), "k-item");
        equal(li.attr("data-index"), 0);
    });

    test("kendoStaticList renders selected class if item is selected", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            value: ["item"],
            template: '#:data#'
        });

        list.dataSource.read();

        var li = element.children(":first");

        equal(li.attr("class"), "k-item k-state-selected");
    });

    test("kendoStaticList renders multiple selected class if multiple items are selected", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            value: ["item1", "item3"],
            template: '#:data#'
        });

        list.dataSource.read();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item k-state-selected");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-selected");
    });

    test("kendoStaticList renders selected item when object is complex", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: [
                { name: "item1" },
                { name: "item2" },
                { name: "item3" }
            ],
            value: ["item1", "item3"],
            template: '#:data#'
        });

        list.dataSource.read();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item k-state-selected");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-selected");
    });

})();
