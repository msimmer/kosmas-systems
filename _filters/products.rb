module Jekyll
  module ProductsFilter
    def sort_products(items)
      items = items.sort { |a, b| a.data['date'] <=> b.data['date'] } .reverse

      featured = items.select { |a| a.data['featured'] }
      items = featured + (items - featured)
      items
    end
  end
end

Liquid::Template.register_filter(Jekyll::ProductsFilter)
