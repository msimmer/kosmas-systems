module TextFilter
  def currency(input)
    return "€ %.2f" % (input * 0.01).to_s.gsub(/(\d)(?=(\d\d\d)+(?!\d))/, "\\1,")
  end
end

Liquid::Template.register_filter(TextFilter)
